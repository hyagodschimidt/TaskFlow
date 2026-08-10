FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore TaskFlow.slnx

RUN dotnet publish src/TaskFlow.Api/TaskFlow.Api.csproj \
    --configuration Release \
    --output /app/publish \
    --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:5137

EXPOSE 5137

ENTRYPOINT ["dotnet", "TaskFlow.Api.dll"]