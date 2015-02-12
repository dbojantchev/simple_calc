/**
 * Created by Dimitar on 9/5/14.
 */

(function(){

    function simple_calc(){

        var final_calculation=false;
        var new_ex=false;
        var register='';
        var memory='';

        function resetAns(){
            document.calculator.ans.value = '';
            document.calculator.ans.placeholder = '0';
        }

        function addToRegister(val){
            register += val;
            $('#mhe_register').html(register);
        }

        function setRegister(val){
            register = val;
            $('#mhe_register').html(register);
        }

        function addOperator(op){
            document.calculator.ans.value+=op;
            addToRegister(document.calculator.ans.value);
            resetAns();
            new_ex=true;
            final_calculation=false;
        }

        function appendLiteral(li){
            new_ex = false;
            if(final_calculation){
                C();
                appendLiteral(li);
            } else {
                if(!isNaN(li)){
                   document.calculator.ans.value = eval( document.calculator.ans.value + li);
                } else {
                   document.calculator.ans.value += li;
                }
            }
        }

        function C(){
            final_calculation=false;
            setRegister('');
            memory = 0;
            resetAns();
        }

        function CE(){
            resetAns();
        }

        function addDecimalPoint(){
            if(document.calculator.ans.value.indexOf('.') === -1){
                appendLiteral('.');
            }
        }

        function pct(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value= eval(document.calculator.ans.value) / 100;
        }

        function plus_minus(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value= -1 * eval(document.calculator.ans.value);
        }

        function recip(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value= 1 / eval(document.calculator.ans.value);
        }

        function sqrt(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value=Math.sqrt(eval(document.calculator.ans.value));
        }

        function power2(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value=Math.pow(eval(document.calculator.ans.value),2);
        }

        function power3(){
            if(document.calculator.ans.value === '') return;
            document.calculator.ans.value=Math.pow(eval(document.calculator.ans.value),3);
        }

        function mem_clear(){
            memory = 0;
            new_ex=true;
        }

        function mem_recall(){
            if(memory !== '' && new_ex){
               document.calculator.ans.value=memory;
            }
        }

        function mem_add(){
            if(document.calculator.ans.value !== ''){
              if(memory === '') memory = 0;
              memory +=  eval(document.calculator.ans.value);
            }
            resetAns();
            new_ex=true;
        }

        var mem_sub = function(){
            if(document.calculator.ans.value !== ''){
                if(memory === '') memory = 0;
                memory -=  eval(document.calculator.ans.value);
            }
            resetAns();
            new_ex=true;
        };

        var calculateFinal = function(){
            if(!final_calculation){
                addToRegister(document.calculator.ans.value);
                document.calculator.ans.value=eval(register);
                final_calculation=true;
                setRegister('');
            }
        };

        window.onload = function(){
            $('#b_MC').click( function() {
                mem_clear();
            });

            $('#b_MR').click( function() {
                mem_recall();
            });

            $('#b_M_plus').click( function() {
                mem_add();
            });

            $('#b_M_minus').click( function() {
                mem_sub();
            });

            $('#b_C').click( function() {
                C();
            });

            $('#b_CE').click( function() {
                CE();
            });

            $('#b_point').click( function() {
                addDecimalPoint();
            });

            $('#b_plus_minus').click( function() {
                plus_minus();
            });

            $('#b_pct').click( function() {
                pct();
            });

            $('#b_sqrt').click( function() {
                sqrt();
            });

            $('.calc_lit').click( function() {
                if(this.value === undefined) return;
                appendLiteral(this.value);
            });

            $('#b_plus').click( function() {
                addOperator('+');
            });

            $('#b_minus').click( function() {
                addOperator('-');
            });

            $('#b_mult').click( function() {
                addOperator('*');
            });

            $('#b_div').click( function() {
                addOperator('/');
            });

            $('#b_recip').click( function() {
                recip();
            });

            $('#b_pow2').click( function() {
                power2();
            });

            $('#b_pow3').click( function() {
                power3();
            });

            $('#b_calc').click( function() {
                calculateFinal();
            });
        };
    }

    window.mhe_simple_calc = new simple_calc();

})();