export function ld(s1: string, s2: string): f64 {
  var short: string = s1;
  var long: string = s2;
  if (s1.length < s2.length) {
    short = s2;
    long = s1;
  }
  var longLength: u32 = long.length;
  if (longLength == 0) {
    return 1.0;
  }
  return (
    (longLength - ldED(long, short)) / longLength
  );
}

function ldED(s1: string, s2: string): f64 {
  // WOuld convert to lower case here 
  var costs = new Array<f64>();
  
  for (let p = 0; p < s1.length; p++) {
    var lastValue: f64 = p;
    for (let q = 0; q < s2.length; q++) {
      if (p == 0) {
        costs[q] = q;
      } else {
        if (q > 0) {
          var newValue: f64 = costs[q-1];
          if (s1.charAt(p-1) != s2.charAt(q-1)) {
            let inlineMath = Math.min(newValue, lastValue);
            newValue = Math.min(inlineMath, costs[q]) + 1;
          }
          costs[q-1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (p > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}
