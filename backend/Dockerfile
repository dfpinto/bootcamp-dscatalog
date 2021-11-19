# Criando imagem do dscatalog
FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/dscatalog-0.0.1-SNAPSHOT.jar dscatalog.jar
ENTRYPOINT ["java","-jar","/dscatalog.jar"]

# Criando container para dscatolog usando banco postgres do heroku
#docker run -p 8080:8080 --name dscatalog-heroku -e APP_PRIFILE=dev -e DB_URL=jdbc:postgresql://ec2-3-209-38-221.compute-1.amazonaws.com:5433/d46ru5vo7n52r -e DB_USERNAME=cnctypmkratgub -e DB_PASSWORD=ab7f52e4b84fecb93648009debc17bc57405bdb8aaf5e05476121c6eb3934431 dscatalog:v1
