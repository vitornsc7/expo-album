# Welcome to your Expo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Image Picker no projeto

Esta base já está com `expo-image-picker` integrado para publicar foto no feed pela aba **Novo Post**.

### Configuração

No `app.json`, o plugin está em `expo.plugins` com:
- `photosPermission`
- `cropToolbarColor` (claro/escuro)

### Fluxo implementado

Arquivo: `app/(tabs)/explore.tsx`

1. Toque em **Importar da galeria**.
2. O app solicita permissão via `ImagePicker.requestMediaLibraryPermissionsAsync()`.
3. Se negar, mostra `Alert` e interrompe.
4. Se permitir, abre `launchImageLibraryAsync()` com:
   - `mediaTypes: ['images']`
   - `allowsEditing: true`
   - `aspect: [4, 3]`
   - `quality: 1`
5. Com seleção confirmada (`!result.canceled`), salva `result.assets[0].uri`.
6. **Publicar** só habilita com descrição + imagem.
7. Ao publicar, o post é inserido no topo do feed.

### Feed

- `contexts/feed-context.tsx`: mantém `posts[]` e usa `addPost(next)` para inserir no topo (`[next, ...prev]`).
- `app/(tabs)/index.tsx`: renderiza a lista com imagem e descrição.

### Observação

A funcionalidade de câmera foi deixada separada para implementação posterior.

