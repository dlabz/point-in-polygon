module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    
    /**
    The original algorythm was completely missing the point.
    Idea is that intersections are found between one ray and edges.
    I moved the whole polygon aligning the test point with zero
    that allowed me to simply look if the edges cross the +XAxis[+1,0]
    Since I only needed above, on or below, Math.sign() was perfect choice.
    The algorythm now uses only two additions per point, no multiplication or division.
    The map 
    This can be further optimized by using -1 * -1 to determine quadrants, 
    significantly reducing number of conditionals
    
    I made this with a sole intention of trying to save the world, so share it with everyone, 
    let me know if you find an error or a way to optimize. 
    
    Keep looking for ways to optimize,
    and don't do anything I wouldn't
    
    Dlabz
    
    **/
    console.warn('This was not tested. The code is simply an illustration.')
    const x = point[0], y = point[1];
    const mod = vs.length;
    return vs
            .map(([xi,yi])=>[Math.sign(xi - x), Math.sign(yi - y)]) //move shape so Y_AXIS passes trough point. we only need values in term of [-1,0,1]
            .map((p,i,a)=>[ p, a[(i-1+mod)%mod] ]) //bulid pairs [point,to] (I forgot why I wanted triplets) [a[(i-1+mod)%mod],p,a[(i-1+mod)%mod]])
            .filter(([p,to])=>!(p[0]<0 && to[0]<0))//if edge start and end left, does not cross the ray X+
            .filter(([p,to])=> p[1] == 0 || (p[1]<0 && to[1]>=0) || (p[1]>0 && to[1]<0)) //if x is n Y_AXIS OR ((startsUnder and !endUnder) || (!startUnder and endUnder)) we have intersection
            .length % 2; //module to count passes
};
