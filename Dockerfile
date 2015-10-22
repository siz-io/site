FROM ghost

# Cannot use /var/lib/ghost because it's declared as VOLUME in ghost image
ENV GHOST_CONTENT /var/lib/ghost-content
RUN mkdir -p "$GHOST_CONTENT" && mkdir "$GHOST_CONTENT/data" && mkdir "$GHOST_CONTENT/images"
ADD apps $GHOST_CONTENT/apps/
ADD themes $GHOST_CONTENT/themes/
ADD config.js $GHOST_SOURCE/
RUN chown -R user:user "$GHOST_CONTENT"

# To pipe output to [Logentries](https://logentries.com)
RUN npm install -g logentries-piper

USER user
ENTRYPOINT []
CMD npm start 2>&1 | logentries-piper
