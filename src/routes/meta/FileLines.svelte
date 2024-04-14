<script>
    import * as d3 from "d3";

    export let lines = [];

    let files = [];
    $: {
        files = d3.groups(lines, d => d.file).map(([name, lines]) => {
            return {name, lines};
        });
    }
</script>

<style>

    dl {
        display: grid;
        grid-template-columns: max-content;
        grid-gap: 5px;

        & > div {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: subgrid;
        }
    }

    dt {
        grid-column: 1;
    }

    dd {
        grid-column: 2;
    }


</style>

<dl class="files">
	{#each files as file (file.name) }
		<div>
			<dt>
				<code>{file.name}</code>
			</dt>
			<dd>{file.lines.length} lines</dd>
		</div>
	{/each}
</dl>
