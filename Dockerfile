FROM openjdk:17
LABEL maintainer="clennacrivopoulos@gmail.com"
EXPOSE 8080
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]