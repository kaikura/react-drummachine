// length in seconds of the actual quarter note
    var fund_note;
    var fund_measure;
    var tone_note;
    var virtual_BPM;

    //same function

    function  musicTheoryComputation(){
        fund_note = 60/new_BPM;
        fund_measure = fund_note * 4;
        tone_note = (fund_measure * TS_Den) / (4 * TS_Num);
        virtual_BPM = (tone_note * new_BPM) / fund_note;}