class Matrix
{
    
    constructor(rows, cols)
    {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        
        for(let i = 0; i < this.rows; i++){
            this.data[i] = [];
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] = 0;
            }
        }    
    }

    randomize(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                this.data[i][j] = Math.random() * 2  - 1;
            }
        }
    }

    add(n){
        if(n instanceof Matrix)
        {
            for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                this.data[i][j] += n.data[i][j];
            }
        }
        }
        else
        {
            for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                this.data[i][j] += n;
            }
        }
        }
        
    }
    
    toArray()
    {
        let arr = [];
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
    
    static fromArray(arr)
    {
        let m = new Matrix(arr.length, 1);
        for(let i = 0; i < arr.length; i++)
            m.data[i][0] = arr[i];
        return m;
    }
        static multiply(a, b)
        {
            if(a.cols !== b.rows)
            {
                console.log('wrong matching cols - rows');
                return undefined;
            }
            else
            {   
                let result = new Matrix(a.rows, b.cols);
                for(let i = 0; i < a.rows; i++)
                {
                    for(let j = 0; j < b.cols; j++)
                    {
                        for(let k = 0; k < a.cols; k++)
                        {
                            result.data[i][j] += a.data[i][k] * b.data[k][j];
                        }
                    }
                }
                return result;
            }
        
        }

    multiply(n){
        if(n  instanceof Matrix)
        {
            for(let i = 0; i < this.rows; i++){
              for(let j = 0; j < this.cols; j++)
                {
                    this.data[i][j] *= n.data[i][j];
                }
            }  
        }
    else
    {
        for(let i = 0; i < this.rows; i++){
          for(let j = 0; j < this.cols; j++)
            {
                this.data[i][j] *= n;
            }
        }  
    }
         
        
   
}
    
    static transpose(m)
    {
        let res = new Matrix(m.cols, m.rows);
        for(let i = 0; i < m.cols; i++){
            for(let j = 0; j < m.rows; j++)
            {
                res.data[i][j] = m.data[j][i];   
            }
        }  
        return res;
        
    }
    
    map(fn)
    {
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                this.data[i][j] = fn(this.data[i][j]);
            }
        }  
    }
    
    static map(matrix, fn)
    {
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++)
            {
                matrix.data[i][j] = fn(matrix.data[i][j]);
            }
        }
        return matrix;
    }

    print()
    {
        console.table(this.data);
    }
    
}



