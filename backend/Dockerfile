FROM adoptopenjdk:11-jre-hotspot
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} bugsolver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "bugsolver-0.0.1-SNAPSHOT.jar"]