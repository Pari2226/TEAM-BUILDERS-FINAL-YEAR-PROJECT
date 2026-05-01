from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / 'data' / 'recommendation_data.csv'

users_df = pd.read_csv(DATA_FILE)
users_df['skill_text'] = users_df['skills'].fillna('')
vectorizer = TfidfVectorizer()
skill_matrix = vectorizer.fit_transform(users_df['skill_text'])


@app.get('/health')
def health():
    return jsonify({'status': 'ok', 'service': 'ml-recommendation-service'})


@app.post('/recommend')
def recommend():
    payload = request.get_json(silent=True) or {}
    input_skills = payload.get('skills', [])

    if not isinstance(input_skills, list):
        return jsonify({'message': 'skills must be an array'}), 400

    input_text = ' '.join(input_skills).strip()
    if not input_text:
        return jsonify([])

    input_vector = vectorizer.transform([input_text])
    scores = cosine_similarity(input_vector, skill_matrix).flatten()

    ranked = users_df.assign(score=scores).sort_values(by='score', ascending=False).head(5)
    recommendations = []

    for _, row in ranked.iterrows():
        recommendations.append({
            'name': row['name'],
            'skills': [skill.strip() for skill in str(row['skills']).split(',') if skill.strip()],
            'matchScore': int(round(row['score'] * 100))
        })

    return jsonify(recommendations)


if __name__ == '__main__':
    port = 5001
    app.run(host='0.0.0.0', port=port, debug=True)
