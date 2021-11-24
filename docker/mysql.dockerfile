FROM mysql:8.0.26
MAINTAINER Diogo Bratti
COPY /extractDbMinimal.sh /src/extractDbMinimal.sh
RUN chmod 755 /src/extractDbMinimal.sh
RUN ./src/extractDbMinimal.sh
EXPOSE 3306
