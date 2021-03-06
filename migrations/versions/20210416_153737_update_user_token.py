"""update user token

Revision ID: f7c3cadb2fad
Revises: 
Create Date: 2021-04-16 15:37:37.713412

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f7c3cadb2fad'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('resetToken', sa.String(length=255), nullable=True),
    sa.Column('resetDate', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('players',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('height', sa.String(), nullable=True),
    sa.Column('weight', sa.String(), nullable=True),
    sa.Column('position', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('team_name', sa.String(), nullable=True),
    sa.Column('team_city', sa.String(), nullable=True),
    sa.Column('team_state', sa.String(), nullable=True),
    sa.Column('bats', sa.String(), nullable=True),
    sa.Column('throws', sa.String(), nullable=True),
    sa.Column('dob', sa.String(), nullable=True),
    sa.Column('hot_list', sa.Boolean(), nullable=True, create_constraint=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('URL', sa.String(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('non_pitcher_evaluations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('hitting_ability', sa.Integer(), nullable=False),
    sa.Column('power', sa.Integer(), nullable=False),
    sa.Column('running_speed', sa.Integer(), nullable=False),
    sa.Column('baserunning', sa.Integer(), nullable=False),
    sa.Column('arm_str', sa.Integer(), nullable=False),
    sa.Column('arm_acc', sa.Integer(), nullable=False),
    sa.Column('fielding', sa.Integer(), nullable=False),
    sa.Column('arm_range', sa.Integer(), nullable=False),
    sa.Column('baseball_instinct', sa.Integer(), nullable=False),
    sa.Column('aggresiveness', sa.Integer(), nullable=False),
    sa.Column('pull', sa.String(), nullable=True),
    sa.Column('str_away', sa.String(), nullable=True),
    sa.Column('opp_field', sa.String(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('notes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('text', sa.Text(), nullable=False),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pitcher_evaluations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fast_ball', sa.Integer(), nullable=False),
    sa.Column('curve', sa.Integer(), nullable=False),
    sa.Column('control', sa.Integer(), nullable=False),
    sa.Column('change_of_pace', sa.Integer(), nullable=False),
    sa.Column('slider', sa.Integer(), nullable=False),
    sa.Column('knuckle_ball', sa.Integer(), nullable=False),
    sa.Column('other', sa.Integer(), nullable=False),
    sa.Column('poise', sa.Integer(), nullable=False),
    sa.Column('baseball_instinct', sa.Integer(), nullable=False),
    sa.Column('aggresiveness', sa.Integer(), nullable=False),
    sa.Column('arm_action', sa.String(), nullable=True),
    sa.Column('delivery', sa.String(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('videos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('content_type', sa.String(), nullable=True),
    sa.Column('player_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['player_id'], ['players.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('videos')
    op.drop_table('pitcher_evaluations')
    op.drop_table('notes')
    op.drop_table('non_pitcher_evaluations')
    op.drop_table('images')
    op.drop_table('players')
    op.drop_table('users')
    # ### end Alembic commands ###
