FROM mysql:8.0.26
MAINTAINER Diogo Bratti
COPY /extraiBD.sh /src/extraiBD.sh
RUN chmod 755 /src/extraiBD.sh
RUN ./src/extraiBD.sh
EXPOSE 3306
