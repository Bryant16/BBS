"""update to image

Revision ID: 8fe81afc3e6d
Revises: bee04ca2bcc4
Create Date: 2021-04-04 00:15:23.619953

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8fe81afc3e6d'
down_revision = 'bee04ca2bcc4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('images', sa.Column('x', sa.String(), nullable=True))
    op.add_column('images', sa.Column('y', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('images', 'y')
    op.drop_column('images', 'x')
    # ### end Alembic commands ###
