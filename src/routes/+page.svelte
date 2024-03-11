<script> 
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
</script>

<style>
    dl {
        display: grid;
        grid-template-columns: max-content;
        grid-gap: 5px;
    }

    dt {
        font-weight: bold;
    }

    dd {
        margin: 0;
        grid-column-start: 2;
    }
</style>

<h1>Nhung Van</h1>

<p>I'm a junior studying CS and AI.</p>
<img class = 'panda-img' src="./images/panda.png" alt="A picture of a panda.">

<section>
    <h2> 
        My Github Stats
    </h2>

    {#await fetch("https://api.github.com/users/nhungbi") }
        <p>Loading...</p>
    {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data}
            <dl>
                <dt> Github ID: </dt>
                <dd> { data.login } </dd>

                <dt> Number of Public Repos: </dt>
                <dd> { data.public_repos } </dd>

                <dt> Number of Public Gists: </dt>
                <dd> { data.public_gists } </dd>

                <dt>Number of followers: </dt>
                <dd> { data.followers } </dd>
            </dl>
            
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}
    {:catch error}
        <p class="error">
            Something went wrong: {error.message}
        </p>
    {/await}

</section>


<h2> Latest Projects </h2>
<div class="projects highlights">
    {#each projects.splice(0,3) as p}
        <Project info={p} hLevel=3 />
    {/each}
</div>



