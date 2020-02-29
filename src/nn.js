function sigmoid(x)
{
    return 1 / (1 + Math.exp( -x ));
}

function dsigmoid(y)
{
    return y * (1 - y);
}
class NeuralNetwork
{
    constructor(input_nodes, hidden_nodes, output_nodes)
    {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;
        
        this.w_ih = new Matrix(hidden_nodes, input_nodes);
        this.w_ho = new Matrix(output_nodes, hidden_nodes);
        this.w_ih.randomize();
        this.w_ho.randomize();
        
        this.bias_h = new Matrix(hidden_nodes, 1);
        this.bias_o = new Matrix(output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
        this.learning_rate = 0.001;
    }
    
    predict(input_array)
    {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.w_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        
        let output = Matrix.multiply(this.w_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid); 
        return output.toArray();
    }
    
    setLearningRate(val)
    {
        this.learning_rate = val;
    }
    
    train(input_array, result)
    {
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.w_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        
        let output = Matrix.multiply(this.w_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid); 
        // Feedforward End
        
        let outputs_arr = output.toArray();
        let err = [];
        for(let i = 0; i < outputs_arr.length; i++)
        {
            err.push(-outputs_arr[i] + result[i]);
        }
        let out_err = Matrix.fromArray(err);
        
        let hid_err = Matrix.multiply(Matrix.transpose(this.w_ho), out_err);
        
        let gradients = Matrix.map(output, dsigmoid);
        gradients.multiply(out_err);
        gradients.multiply(this.learning_rate);
        
        this.bias_o.add(gradients);
        
        let deltaw_ho = Matrix.multiply(gradients, Matrix.transpose(hidden));
        
        this.w_ho.add(deltaw_ho);
        
        let hid_gradient = Matrix.map(hidden, dsigmoid);
        hid_gradient.multiply(hid_err);
        hid_gradient.multiply(this.learning_rate);
        
        let deltaw_ih = Matrix.multiply(hid_gradient, Matrix.transpose(inputs));
        this.w_ih.add(deltaw_ih);
        this.bias_h.add(hid_gradient);
        

    }
    
}