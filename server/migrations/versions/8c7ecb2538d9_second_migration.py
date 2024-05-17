"""second migration

Revision ID: 8c7ecb2538d9
Revises: ce4f10c0384e
Create Date: 2024-05-16 08:04:47.350913

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c7ecb2538d9'
down_revision = 'ce4f10c0384e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('role', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_email', ['email'])

    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_index('ix_tokenblocklist_jti')
        batch_op.create_index(batch_op.f('ix_tokenblocklist_jti'), ['jti'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_tokenblocklist_jti'))
        batch_op.create_index('ix_tokenblocklist_jti', ['jti'], unique=False)

    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.drop_constraint('uq_email', type_='unique')

    op.drop_table('users')
    # ### end Alembic commands ###