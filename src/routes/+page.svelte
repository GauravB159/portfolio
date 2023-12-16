<script>
    import "./global.css";

    const aoc_days = ["Trebuchet?!", "Cube Conundrum", "Gear Ratios", "Scratchcards"]
</script>
<h1>AOC 2023 Solutions</h1>
{#each aoc_days as day, index}
    <div>
        <a target="_blank" href="/aoc/day-{index + 1}">{day}</a>
    </div>
{/each}