function  LU(A){
	var i, j, k, m, n = A.length;	
	L = new Array(n);
	for (i = 0; i < n; i++) {
	   	L[i] = new Array(n);
		for (j = 0; j < n; j++)
			L[i][j] = 0;
		L[i][i] = 1;
	}		
	for (k=0; k < n-1; k++) {		
		L[k][k] = 1;
		for (i=k+1; i < n; i++) {
			m = A[i][k]/A[k][k];
			L[i][k] = m;
			A[i][k] = 0;
			for (j=k+1;j < n;j++)
				A[i][j] = A[i][j]-m*A[k][j];
		}  
	}
	return {L:L,U:A};
}


function mmul(a, b){
	let m = a.length, n = a[0].length, 
	  m2 = b.length, n2 = b[0].length,
	  c;
	if (n != m2)
		return;
	c = new Array(m);
	for (let i = 0; i < m; i++) {
		c[i] = new Array(n2);
		for (let j = 0; j < n2; j++) {
			let s = 0;
			for (let k = 0; k < n; k++)
				s = s + a[i][k]*b[k][j];
			c[i][j] = s;
		}	
	}
	return c;	
}

function  fmtMat(matrix){
	return JSON.stringify(matrix).
	       replace(/\],\[/g, '],<br>&nbsp[');
}

function BtnLUClick() {
	let input, A, lu, out;
	input = document.getElementById('A');
	out = document.getElementById('res');
	A = JSON.parse(input.value);  
	lu = LU(A);
	out.innerHTML = '<b>L:</b><br>' + fmtMat(lu.L) + '<br><br>' + 
	  '<b>U:</b><br>' + fmtMat(lu.U);
}
  document.getElementById('fatLU').onclick = BtnLUClick;
