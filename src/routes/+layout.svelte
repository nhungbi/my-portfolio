<slot/>

<style>
    .color-scheme {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 80%;
    font-family: inherit;
    }
</style>

<script>
    let root = globalThis?.document?.documentElement;
    let localStorage = globalThis.localStorage ?? {};

    let colorScheme = "light dark";
    if (localStorage.colorScheme) {
	    colorScheme = localStorage.colorScheme;
    }

    // need $: for reactive
    $: root?.style.setProperty("color-scheme", colorScheme);
    $: localStorage.colorScheme = colorScheme;

</script>

<label class="color-scheme">
    Theme:
    <select bind:value={ colorScheme }>
        <option value='light dark'> Automatic </option>
        <option value='light'> Light </option>
        <option value='dark'>  Dark </option>
    </select>
</label>


