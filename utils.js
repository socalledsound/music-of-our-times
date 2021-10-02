const getRandomColor = () => [random(0,255), random(0,255), random(0,255)]

const generateCircle = (count) => ({ id: count, 
                                    x: random(0, window.innerWidth),
                                    y: random(0, window.innerHeight),
                                    size: random(minCircleSize, maxCircleSize),
                                })


const generateCircles = (num) => {
    let anotherArray = []
    let arr = []
    console.log(arr)
    let count = 0 
    let success = 0
    arr.push(generateCircle(count))
    anotherArray.push(generateCircle(count))
    console.log(anotherArray)
    console.log(arr)
    count++
    success++
    console.log(success)
    while(success < num){
        const newCircle = generateCircle(count)
        const noOverlap = checkCircleAgainstArray(newCircle, arr)
        console.log(noOverlap)
        if(noOverlap){
            success++
            arr.push(newCircle)
            console.log(arr)
        }
        count++
            if(count > 10000){
                success = 7
            }
    }

    // console.log(arr)
    //     arr.forEach(item => {

    //         const overlap = checkCircles(newCircle, item)
    //         console.log(overlap, 'overlap in generateCircles')
    //         if(!overlap){
    //             arr.push(newCircle)
    //             success ++
    //            console.log('not overlap')
    //         }else{
    //             console.log('overlap')
    //             console.log('no push', newCircle)    
    //         }
    //     }) 
    //     count++
    //     console.log(arr)
    //     if(count > num -1){
    //         complete = true
    //     }
    //     // if(checkCircleAgainstArray(newCircle, arr)){
    //     //     arr.push(newCircle)
    //     //     console.log(arr)
    //     // }else{
    //     //     console.log('making new circle')
    //     // }
    //     // count++
    // }
    console.log(success, count)
    //arr = Array.from({length: num}, () => generateCircle(count))
    console.log('this should come last', arr)
    return arr
}


const checkCircles = (circle1, circle2) => {
    let clear = false
    let maxSize = circle1.size > circle2.size ? circle1.size : circle2.size
    let d = dist(circle1.x, circle1.y, circle2.x, circle2.y)
    if(d > maxSize * 1.5){
        clear = true
        return clear
    }
    console.log(clear, 'in checkCircles')
    return clear
}

const checkCircleAgainstArray = (item, arr) => {
    console.log('checking circle against array')
     let clear = true
     console.log(arr.length, arr)

     for( let i = 0; i < arr.length; i++){
        let maxSize = item.size > arr[i].size ? item.size : arr[i].size 
        let d = dist(item.x, item.y, arr[i].x, arr[i].y)
        const check = d < maxSize * 1.5 
        console.log(d, maxSize * 1.5)
        console.log('check : ', check)
        if(check){
            clear = false
            return clear
        }
        console.log(maxSize, d)   
     }
    
    return clear
}

