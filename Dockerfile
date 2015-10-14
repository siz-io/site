FROM quay.io/sizio/ghost-siz

MAINTAINER Fred-b for Siz <frederic.boulet@gmail.com>

ADD https://github.com/siz-io/ghost-wbkd/archive/master.tar.gz /$GHOST_SOURCE/content/themes/siz-theme.tar.gz

RUN tar -xvzf /$GHOST_SOURCE/content/themes/siz-theme.tar.gz -C $GHOST_SOURCE/content/themes/ && rm /$GHOST_SOURCE/content/themes/siz-theme.tar.gz


