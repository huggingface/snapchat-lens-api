## Snapchat Lens API

Snapchat Lenses include a scripting library for creating rich interactive experiences. With scripts, Lenses can respond to touch input, play animation and audio, modify Scene Objects, etc.

Snapchat provides a Javascript interpreter and exposes a number of variables and classes, which are documented in the [official API documentation](https://lensstudio.snapchat.com/api/).

> This type definition builds upon the official API, which it re-packages in a format that's easy to consume by production-grade applications.

### Install using npm

```
npm i snapchat-lens-api
```

If you're using Typescript in your build process, add the following to your `tsconfig.json`:
```
"types": [ "./node_modules/snapchat-lens-api" ]
```

### Feedback

Any feedback? Please open an issue.

<p style="text-align: center" align="center">
	<img src="https://raw.githubusercontent.com/huggingface/snapchat-lens-api/master/logo.png">
</p>
