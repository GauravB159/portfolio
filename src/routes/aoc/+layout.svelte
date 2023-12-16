<script>
	import {day} from "./store"
    import { Button, Spinner } from 'flowbite-svelte';

    function cancelExecution(){
        $day.running = 3
    }

</script>
<main>
    <div class="header">
        <h1 class=""><a target="_blank" href={`https://adventofcode.com/2023/day/${$day.number}`}>Day {$day.number}: {$day.name}</a></h1>
        <div class="buttons">
            {#if $day.running == 1}
                <Button color="dark" on:click={cancelExecution}><Spinner class="me-3" size="4" color="white" />Stop solving</Button>
                <Button color="yellow" disabled>Solve 2 star</Button>
            {:else if $day.running == 2}
                <Button color="dark" disabled>Solve 1 star</Button>
                <Button color="yellow" on:click={cancelExecution}><Spinner class="me-3" size="4" color="white" />Stop solving</Button>
            {:else}
                {#if $day.running == 3}
                    <Button color="light" on:click={$day.initialize}>Reset</Button>
                {/if}
                <Button color="dark" on:click={$day.handleOneStar}>Solve 1 star</Button>
                <Button color="yellow" on:click={$day.handleTwoStar}>Solve 2 star</Button>
            {/if}
        </div>
    </div>
    <div class="content">
        <slot></slot>
    </div>
</main>
<style>
    .header{
        display: flex;
        width: 75vw;
        margin: auto;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
    }
    a{
        text-decoration: underline;
    }
    .content{
        width: 75vw;
        margin: auto;
    }
</style>