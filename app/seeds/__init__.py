from flask.cli import AppGroup
from .users import seed_users, undo_users
from .players import seed_players, undo_players
from .images import seed_images, undo_images
from .videos import seed_videos, undo_videos
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_players()
    seed_images()
    seed_videos()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_players()
    undo_images()
    undo_videos()
    # Add other undo functions here
