from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Note

notes_routes = Blueprint('notes', __name__)


@notes_routes.route('/', methods=['POST'])
def create_note():
    data = request.get_json()
    try:
        new_note = Note(
            title=data['title'],
            text=data['note'],
            player_id=data["playerId"]
        )
        db.session.add(new_note)
        db.session.commit()
        return jsonify({'note': new_note.to_dict()})
    except:
        return jsonify({'hit': False})