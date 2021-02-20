"""dob

Revision ID: bee04ca2bcc4
Revises: 9a179ca5da78
Create Date: 2021-02-19 22:03:59.748780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bee04ca2bcc4'
down_revision = '9a179ca5da78'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('players', sa.Column('dob', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('players', 'dob')
    # ### end Alembic commands ###
