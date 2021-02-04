from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation

players_routes = Blueprint('players', __name__)


@players_routes.route('/')
def players():
    players = Player.query.filter(Player.user_id == current_user.id).order_by(Player.first_name).all()
    return jsonify({"players": [player.to_dict() for player in players]})


@players_routes.route('/', methods=["POST"])
def create_player():
    data = request.get_json()
    try:
        new_player = Player(
            first_name=data["first_name"],
            last_name=data["last_name"],
            user_id=current_user.id,
            height=data["height"],
            weight=data["weight"],
            position=data["position"],
            address=data["address"],
            phone_number=data["phone_number"],
            email=data["email"],
            team_name=data["team_name"],
            team_city=data["team_city"],
            team_state=data["team_state"],
            bats=data["bats"],
            throws=data["throws"]
        )
        db.session.add(new_player)
        db.session.commit()
        return jsonify({'id': new_player.id})
    except:
        return jsonify({'errors': True})


@players_routes.route('/<int:id>')
def get_player(id):
    try:
        single_player = Player.query.filter(Player.id == id, Player.user_id == current_user.id).all()
        return jsonify({"player": single_player[0].to_dict()})
    except:
        return jsonify({'errors': 'No player here'})


@players_routes.route('/<int:id>/pitcher/', methods=["POST"])
def create_player_pitcher_eval(id):
    data = request.get_json()
    try:
        new_pitcher_eval = Pitcher_Evaluation(
            fast_ball=data["fastball"],
            curve=data["curve"],
            control=data["control"],
            change_of_pace=data["pace"],
            slider=data["slider"],
            knuckle_ball=data["knuckle"],
            other=data["other"],
            poise=data["poise"],
            baseball_instinct=data["instinct"],
            aggresiveness=data["aggressive"],
            arm_action=data["arm"],
            delivery=data["delivery"],
            player_id=id,
        )
        db.session.add(new_pitcher_eval)
        db.session.commit()
        return jsonify({'created': True})
    except:
        return jsonify({'errors': 'Unable to Process at this moment'})


@players_routes.route('/<int:id>/nonpitcher/', methods=["POST"])
def create_non_player_pitcher_eval(id):
    data = request.get_json()
    try:
        new_non_pitcher_eval = Pitcher_Evaluation(
            hitting_ability=data["hitting"],
            power=data["power"],
            running_speed=data["running"],
            baserunning=data["baseRunning"],
            arm_str=data["armStr"],
            arm_acc=data["armAcc"],
            fielding=data["fielding"],
            arm_range=data["armRange"],
            baseball_instinct=data["instinct"],
            aggresiveness=data["aggressive"],
            pull=data["pull"],
            str_away=data["away"],
            opp_field=data["opp"],
            player_id=id,
        )
        db.session.add(new_non_pitcher_eval)
        db.session.commit()
        return jsonify({'created': True})
    except:
        return jsonify({'errors': 'Unable to Process at this moment'})