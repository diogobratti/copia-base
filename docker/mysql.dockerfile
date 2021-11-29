FROM mysql:8.0.26
MAINTAINER Diogo Bratti
# COPY /extraiBD.sh /src/extraiBD.sh
# RUN chmod 755 /src/extraiBD.sh
# RUN ./src/extraiBD.sh
COPY /bkp_metadados.sql /src/bkp_metadados.sql
COPY /bkp_dados.sql /src/bkp_dados.sql
RUN mysql --host=localhost --port=3306 --user=root --password=eproc@tjsc < /src/bkp_metadados.sql
RUN mysql --host=localhost --port=3306 --user=root --password=eproc@tjsc < /src/bkp_dados.sql
EXPOSE 33060
