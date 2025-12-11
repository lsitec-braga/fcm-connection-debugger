# Firebase Cloud Messaging - MVP

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![JDK](https://img.shields.io/badge/jdk-17-blue)
![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue)

Mobile app to test Firebase Cloud Messaging

## Indice <!-- omit in toc -->

- [✅ Pré-requisitos](#-pré-requisitos)
- [⚙️ Configuração Inicial](#️-configuração-inicial)
  - [1. Variáveis de ambiente](#1-variáveis-de-ambiente)
  - [2. Instalação das dependências](#2-instalação-das-dependências)
  - [3. Instalar as pastas do projeto](#3-instalar-as-pastas-do-projeto)
- [▶️ Executar o projeto](#️-executar-o-projeto)
  - [Rodar o Metro Bundler](#rodar-o-metro-bundler)
  - [Rodar no Android](#rodar-no-android)
  - [Rodar no iOS](#rodar-no-ios)
- [📦 Build de produção](#-build-de-produção)
  - [Gerar APK](#gerar-apk)
  - [Gerar AAB (Google Play)](#gerar-aab-google-play)
  - [Gerar IPA (TODO)](#gerar-ipa-todo)

## ✅ Pré-requisitos

- [Node.js 18+](https://nodejs.org/)  
  👉 Recomendado instalar via [nvm](https://github.com/nvm-sh/nvm) (Linux/Mac) ou [nvm-windows](https://github.com/coreybutler/nvm-windows).
- [JDK17](https://bell-sw.com/pages/downloads/#jdk-17-lts)
  ⚠️ Versões mais recentes podem causar problemas.
- **Caminho do projeto** não muito longo (no Windows o limite é ~240 caracteres).

Verifique seu ambiente com:

```bash
npx expo-doctor
```

Mais detalhes sobre como configurar o ambiente de desenvolvimento (emulador, android SDK, etc.) podem ser encontrados em [Expo - Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=simulated)

## ⚙️ Configuração Inicial

### 1. Variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis necessárias:

```bash
cp .env.example .env
```

### 2. Instalação das dependências

```bash
npm install
```

Para iOS (apenas no MAC)

> Confirmar se esse passo abaixo é necessário no iOS

```bash
cd ios && pod install && cd ..
```

### 3. Instalar as pastas do projeto

```bash
npx expo prebuild
```

## ▶️ Executar o projeto

### Rodar o Metro Bundler

```bash
npm start
```

### Rodar no Android

```bash
npm run android
```

### Rodar no iOS

```bash
npm run ios
```

## 📦 Build de produção

Mais detalhes em [Local app development](https://docs.expo.dev/guides/local-app-development/)

### Gerar APK

```bash
cd android
./gradlew assemble{FlavorName}{Release/Debug}

# Exemplo:
./gradlew assembleClinDebug
```

📂 Saída: `android/app/build/outputs/apk/...`

### Gerar AAB (Google Play)

```bash
cd android
./gradlew bundle{FlavorName}{Release/Debug}

# Exemplo:
./gradlew bundleClinRelease
```

📂 Saída: `android/app/build/outputs/bundle/...`

### Gerar IPA (TODO)

Adições nesta seção são bem vindas
