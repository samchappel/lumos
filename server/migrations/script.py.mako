"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}
from models import Like, Photo

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    with db.engine.connect() as connection:
        photos = connection.execute(select([Photo]))
        for photo in photos:
            likes = connection.execute(select([func.count(Like.id)]).where(Like.photo_id == photo.id)).scalar()
            connection.execute(Photo.update().where(Photo.id == photo.id).values(likes=likes))


def downgrade():
    with db.engine.connect() as connection:
        connection.execute(Photo.update().values(likes=None))
