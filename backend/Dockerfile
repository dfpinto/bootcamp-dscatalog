# Criando imagem do dscatalog
FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/dscatalog-0.0.1-SNAPSHOT.jar dscatalog.jar
ENTRYPOINT ["java","-jar","/dscatalog.jar"]

# Criando container local para dscatolog usando banco postgres do heroku com perfil de dev
#docker run -p 8080:8080 --name dscatalog-heroku -e APP_PROFILE=dev -e DB_URL=jdbc:postgresql://ec2-3-209-38-221.compute-1.amazonaws.com:5432/d46ru5vo7n52r -e DB_USERNAME=cnctypmkratgub -e DB_PASSWORD=ab7f52e4b84fecb93648009debc17bc57405bdb8aaf5e05476121c6eb3934431 dscatalog:v1

# Criando container local para dscatolog usando banco postgres da aws com perfil de prod
#docker run -p 80:8080 --name dscatalog-aws -e APP_PROFILE=prod -e DB_URL=jdbc:postgresql://aulaimplantacao.cyzour9ocw7f.sa-east-1.rds.amazonaws.com:5432/dscatalog -e DB_USERNAME=postgres -e DB_PASSWORD=12345678 dfpinto/dscatalog:v1