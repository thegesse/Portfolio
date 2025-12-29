# Use an official OpenJDK 17 image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src ./src

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the application (skip tests for faster builds)
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot will run on
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/myportfolio-0.0.1-SNAPSHOT.jar"]
