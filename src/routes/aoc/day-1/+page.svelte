<script>
    import {day} from "../store"
    import txt from "./input.txt?raw"
    import { fly } from 'svelte/transition';

    let input_copy = txt.split("\n")
    let leftValue = Array(input_copy.length).fill("_")
    let rightValue = Array(input_copy.length).fill("_")
    /**
	 * @type {boolean[]}
	 */
    let visible_results = Array(input_copy.length).fill(true)
    let processed = 0
    let result = 0
    /**
	 * @type {number[]}
	 */
    let results = []
    /**
	 * @type {HTMLDivElement}
	 */
    let container
    $day = {
        "name": "Trebuchet?!",
        "number": 1,
        "handleOneStar": handleOneStar,
        "handleTwoStar": handleTwoStar,
        "initialize": initialize,
        "running": 0
    }

    function initialize(){
        container.scrollTo({top: 0})
        input_copy = txt.split("\n")
        processed = 0
        $day.running = 0
        result = 0
        results = []
        leftValue = Array(input_copy.length).fill("_")
        rightValue = Array(input_copy.length).fill("_")
        visible_results = Array(input_copy.length).fill(true)
    }
    
    async function handleOneStar(){
        initialize()
        $day.running = 1
        const perRowScrollShift = 2 * (container.scrollHeight) / input_copy.length
        for(let line in input_copy){
            const value = input_copy[line]
            let runLeft = true
            let runRight = true
            let leftIdx = 0
            let rightIdx = 0
            let leftDisplay = ""
            let rightDisplay = ""
            processed = parseInt(line) + 1
            for(let i = 0; i < value.length; i++){
                if($day.running != 1) break
                if(runLeft){
                    leftIdx = i
                    if(value[leftIdx] >= '0' && value[leftIdx] <= '9'){
                        leftDisplay = `<span class='red'>${value.substring(0, leftIdx)}</span><span class='green'>${value[leftIdx]}</span>`
                        leftValue[line] = value[leftIdx]
                        runLeft = false
                    } else {
                        leftDisplay = `<span class='red'>${value.substring(0, leftIdx + 1)}</span>`
                    }
                }
                if(runRight){
                    rightIdx = value.length - i - 1
                    if(value[rightIdx] >= '0' && value[rightIdx] <= '9'){
                        rightDisplay = `<span class='green'>${value[rightIdx]}</span><span class='red'>${value.substring(rightIdx + 1)}</span>`
                        rightValue[line] = value[rightIdx]
                        runRight = false
                    } else {
                        rightDisplay = `<span class='red'>${value.substring(rightIdx)}</span>`
                    }
                }
                if(leftIdx == value.length - 1) input_copy[line] = leftDisplay
                else if(rightIdx == 0) input_copy[line] = rightDisplay
                else if(rightIdx == leftIdx) input_copy[line] = leftDisplay + rightDisplay.replace(`<span class='green'>${value[rightIdx]}</span>`, "")
                else input_copy[line] = leftDisplay + `<span>${value.substring(leftIdx + 1, rightIdx)}</span>` + rightDisplay
                if(processed < 100 || processed > 900) await new Promise(r => setTimeout(r, 30));
                if(!runLeft && !runRight) break
            }
            if($day.running != 1) break
            result += parseInt(leftValue[line] + rightValue[line])
            results = [...results, leftValue[line] + rightValue[line]]
            if(processed < 100 || processed > 900){
                setTimeout(() => {
                    visible_results[line] = false
                }, 100)
            } else { 
                visible_results[line] = false
            }
            container.scrollTo({top: container.clientHeight + (processed / 2 - 40) * perRowScrollShift, behavior: 'smooth'})
        }
        $day.running = 3
    }

    async function handleTwoStar(){
        $day.running = 2
        initialize()
        const mapping = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
        const perRowScrollShift = 2 * (container.scrollHeight) / input_copy.length
        for(let line in input_copy){
            const value = input_copy[line]
            let runLeft = true
            let runRight = true
            let leftIdx = 0
            let rightIdx = 0
            let leftDisplay = ""
            let rightDisplay = ""
            processed = parseInt(line) + 1
            for(let i = 0; i < value.length; i++){
                if($day.running != 1) break
                if(runLeft){
                    leftIdx = i
                    if(value[leftIdx] >= '0' && value[leftIdx] <= '9'){
                        leftDisplay = `<span class='red'>${value.substring(0, leftIdx)}</span><span class='green'>${value[leftIdx]}</span>`
                        leftValue[line] = value[leftIdx]
                        runLeft = false
                    } else {
                        leftDisplay = `<span class='red'>${value.substring(0, leftIdx + 1)}</span>`
                    }
                }
                if(runRight){
                    rightIdx = value.length - i - 1
                    if(value[rightIdx] >= '0' && value[rightIdx] <= '9'){
                        rightDisplay = `<span class='green'>${value[rightIdx]}</span><span class='red'>${value.substring(rightIdx + 1)}</span>`
                        rightValue[line] = value[rightIdx]
                        runRight = false
                    } else {
                        rightDisplay = `<span class='red'>${value.substring(rightIdx)}</span>`
                    }
                }
                if(leftIdx == value.length - 1) input_copy[line] = leftDisplay
                else if(rightIdx == 0) input_copy[line] = rightDisplay
                else if(rightIdx == leftIdx) input_copy[line] = leftDisplay + rightDisplay.replace(`<span class='green'>${value[rightIdx]}</span>`, "")
                else input_copy[line] = leftDisplay + `<span>${value.substring(leftIdx + 1, rightIdx)}</span>` + rightDisplay
                if(processed < 100 || processed > 900) await new Promise(r => setTimeout(r, 40));
                if(!runLeft && !runRight) break
            }
            if($day.running != 1) break
            result += parseInt(leftValue[line] + rightValue[line])
            results = [...results, leftValue[line] + rightValue[line]]
            if(processed < 100 || processed > 900){
                setTimeout(() => {
                    visible_results[line] = false
                }, 100)
            } else { 
                visible_results[line] = false
            }
            container.scrollTo({top: container.clientHeight + (processed / 2 - 40) * perRowScrollShift, behavior: 'smooth'})
        }
        $day.running = 0
    }
</script>
<style>
    .input{
        font-family: 'Noto Sans';
        height: 80vh;
        margin-top: 20px;
        border: 2px solid black;
        padding: 40px;
        padding-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 10px;
        position: relative;
    }

    .scroll_container{
        height: 85vh;
        overflow: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 30px;
        padding-right: 20px;
    }
    :global(.red){
        color: red;
    }
    :global(.green){
        color: green;
        font-weight: bold;
    }
    .row{
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 450px;
        justify-content: space-between;
    }
    .answer{
        font-weight: bold;
    }
    .processed, .result, .result_effect{
        font-weight: bold;
        position: absolute;
        right: 20px;
    }
    .processed{
        top: 10px;
    }
    .result, .result_effect{
        bottom: 10px;
    }
    .result_effect{
        bottom: 60px;
        right: 40px;
    }
    .result_effect_row{
        position: absolute;
    }
</style>
<div class="input">
    <div class="processed">{processed} / {input_copy.length}</div>
    <div class="result_effect">
        {#each results as value, index}
            {#if visible_results[index]}
                <div out:fly={{ y: -50, duration: 600 }} class="result_effect_row">{value}</div>
            {/if}
        {/each}
    </div>
    <div class="result">Result: {result}</div>
    <div bind:this={container} class="scroll_container">
        {#each input_copy as line, index}
            <div class="row">
                <div class="input-line">{@html line}</div>
                <div class="answer">{leftValue[index]}{rightValue[index]}</div>
            </div>
        {/each}
    </div>
</div>