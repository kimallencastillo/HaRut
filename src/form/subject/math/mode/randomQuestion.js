

export const randoQuest = (questions, ctr) => {
    
    if(ctr > 1 ){

    }else {
        var n = questions.length;
        return questions.sort(() => 0.5 - Math.random()).slice(0, n);
        ctr++;
    }
    
}
 