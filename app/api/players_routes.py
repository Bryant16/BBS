from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Non_Pitcher_Evaluation

players_routes = Blueprint('players', __name__)


@players_routes.route('/')
def players():
    players = Player.query.filter(
        Player.user_id == current_user.id).all()
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
        return jsonify({'player': new_player.to_dict()})
    except:
        return jsonify({'errors': True})


@players_routes.route('/<int:id>')
def get_player(id):
    try:
        single_player = Player.query.filter(
            Player.id == id, Player.user_id == current_user.id).all()
        return jsonify({"player": single_player[0].to_dict()})
    except:
        return jsonify({'errors': 'No player here'})

@players_routes.route('/<int:id>', methods=["PUT"])
def update_player(id):
    data = request.get_json()
    try:
        player_to_update = Player.query.get(id)
        player_to_update.first_name = data["first_name"]
        player_to_update.last_name = data["last_name"]
        player_to_update.height = data["height"]
        player_to_update.weight = data["weight"]
        player_to_update.position = data["position"]
        player_to_update.address = data["address"]
        player_to_update.phone_number = data["phone_number"]
        player_to_update.email = data["email"]
        player_to_update.team_name = data["team_name"]
        player_to_update.team_city = data["team_city"]
        player_to_update.team_state = data["team_state"]
        player_to_update.bats = data["bats"]
        player_to_update.throws = data["throws"]
        db.session.commit()
        return jsonify({'player': player_to_update.to_dict()})
    except:
        return jsonify({'Fail': True})

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


@players_routes.route('/<int:id>/nonpitcher/')
def get_non_pitcher_eval(id):
    player = Player.query.filter(
        Player.id == id, Player.user_id == current_user.id).all()
    return jsonify([player[0].get_non_pitcher()])


@players_routes.route('/<int:id>/pitcher/')
def get_pitcher_eval(id):
    player = Player.query.filter(
        Player.id == id, Player.user_id == current_user.id).all()
    return jsonify([player[0].get_pitcher()])


@players_routes.route('/<int:id>/nonpitcher/', methods=["POST"])
def create_non_player_pitcher_eval(id):
    data = request.get_json()
    try:
        new_non_pitcher_eval = Non_Pitcher_Evaluation(
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
            player_id=data["playerId"],
        )
        db.session.add(new_non_pitcher_eval)
        db.session.commit()
        return jsonify({'created': True})
    except:
        return jsonify({'errors': 'Unable to Process at this moment'})


@players_routes.route('/<int:id>/nonpitcher/', methods=["PUT"])
def update_non_player_pitcher_eval(id):
    data = request.get_json()
    try:
        form_to_update = Non_Pitcher_Evaluation.query.filter(
            Non_Pitcher_Evaluation.player_id == id).first()
        form_to_update.hitting_ability = data["hitting"]
        form_to_update.power = data["power"]
        form_to_update.running_speed = data["running"]
        form_to_update.baserunning = data["baseRunning"]
        form_to_update.arm_str = data["armStr"]
        form_to_update.arm_acc = data["armAcc"]
        form_to_update.fielding = data["fielding"]
        form_to_update.arm_range = data["armRange"]
        form_to_update.baseball_instinct = data["instinct"]
        form_to_update.aggresiveness = data["aggressive"]
        form_to_update.pull = data["pull"]
        form_to_update.str_away = data["away"]
        form_to_update.opp_field = data["opp"]
        db.session.commit()
        return jsonify({'done': True})
    except:
        return jsonify({'Fail': True})


@players_routes.route('/<int:id>/pitcher/', methods=["PUT"])
def update_player_pitcher_eval(id):
    data = request.get_json()
    try:
        form_to_update = Pitcher_Evaluation.query.filter(
            Pitcher_Evaluation.player_id == id).first()
        form_to_update.fast_ball = data["fastball"]
        form_to_update.curve = data["curve"]
        form_to_update.control = data["control"]
        form_to_update.change_of_pace = data["pace"]
        form_to_update.slider = data["slider"]
        form_to_update.knuckle_ball = data["knuckle"]
        form_to_update.other = data["other"]
        form_to_update.poise = data["poise"]
        form_to_update.baseball_instinct = data["instinct"]
        form_to_update.aggresiveness = data["aggressive"]
        form_to_update.arm_action = data["arm"]
        form_to_update.delivery = data["delivery"]
        db.session.commit()
        return jsonify({'updated': True})
    except:
        return jsonify({'errors': 'Unable to Process at this moment'})
