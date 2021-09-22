import styled from 'styled-components';
import 'antd/dist/antd.css';

export const TableWrapper = styled.div`
  background-color: #1c1c24;
  padding: 15px;
  overflow: auto;

  .title {
    color: #FFFFFF !important;
    text-anchor: start;
    font-family: Arial;
    font-size: 15.5;
    font-weight: bold;
    stroke: none;
    stroke-width: 0;
  }

  section {
    width: 100%;
    height: 100%;
    /* overflow: auto; */
  }

  .tickets {
    font-size: 10px;
    text-align: center;

    a {
      color: #fff !important;
      font-weight: 600;
      font-size: 17px;
      line-height: 20px;

      p {
        font-size: 11px;
      }
    }

    a:hover {
      color: #0088cc;
    }
  }

  table {
    width: 100%;
    font-size: 10px;
  }

  table thead {
    background: #373747;
  }

  table thead tr {
    color: #ffffff !important;
  }

  table thead tr:first-child th:first-child {
    border-top-left-radius: 10px;
  }

  table thead tr:first-child th:last-child {
    border-top-right-radius: 10px;
  }

  table thead > tr > th {
    height: 46px !important;
    background-color: #373747;
    color: #ffffff;
    border-bottom: none;
    padding-left: 2px;
    padding-right: 2px;
  }

  table tbody tr {
    height: 46px !important;
    background-color: #373747;
    color: #ffffff;
    border-bottom: none;
  }

  table tbody > tr > td {
    color: #ffffff !important;
    background-color: #1c1c24;
    border-bottom: 1px solid #373747;
    padding-top: 25px;
    padding-bottom: 28px;
    padding-left: 2px;
    padding-right: 2px;
    text-align: center;

    a {
      color: #ffffff !important;
      font-weight: 500 !important;
      font-size: 12px !important;
      line-height: 0 !important;
    }
    a:hover {
      color: #0088cc;
    }
  }
  .current_score_fm{
    background-color:#404e67;
    border-radius:5px;
    width:100%;
    min-height:325px;
}

.cs_data_box{
    margin:0px auto;
    width:95%;
}

.cs_data_box h1{
    font-weight:700;
    text-align:center;
    text-transform:uppercase;
    margin:0px;
    padding:0px;
    color:#FFF;
    padding-top:10px;
}
.cs_round_per_fm{
    padding-top:20px;
}

.factorized_score_fm{
    background-color:transparent !important;
    border-radius:5px;
    width:100%;
}

.fs_data_box{
    margin:0px auto;
    width:99%;
}

.fs_color_box{
    width:100%;
    margin:0px 0px 0px 0px;
}

.fs_box_top{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.fs_box_bottom{
    background-color:#2C2C38;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.fs_box_top h2{
    font-size:16px;
    font-weight:700;
    text-align:center;
    text-transform:uppercase;
    margin:0px;
    color:#FFF;
    padding:15px;
}

.fs_box_bottom h1{
    font-size:75px;
    font-weight:700;
    text-align:center;
    text-transform:uppercase;
    margin:0px;
    padding:15px;
}



.fm-incidents{
    background-color:#FF2D2E;
}
.fm-threats{
    background-color:#3DD598;
}
.fm-vulnerabilities{
    background-color:#1E75FF;
}
.fm-risks{
    background-color:#FFC542;
}

.fm-incidents-text{
    color:#FF2D2E;
}
.fm-threats-text{
    color:#3DD598;
}
.fm-vulnerabilities-text{
    color:#1E75FF;
}
.fm-risks-text{
    color:#FFC542;
}


.top_assets_box{
    background-color:#2C2C38;
	border-radius:10px;
	border:5px solid #1c1c24;
	margin:5px 0px 5px 0px;
}

.top_assets_box table tbody > tr > td {
    color: #ffffff;
    background-color: transparent;
    border-bottom: 0px solid #373747;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: left !important;
}

.top_assets_box table tbody tr {
    height: 20px !important;
    background-color: transparent;
    color: #ffffff;
    border-bottom: none;
}

.assets_box_text{
    margin:0px auto;
    width:95%;
    height:80px;
    border:0px solid red;
    overflow:hidden;
}

.assets_box_text h1{
    font-size:15px;
    font-weight:700;
    margin:0px;
    padding:5px 0px 5px 0px;
    color:#FFF;
}

.assets_box_text h3{
    font-size:12px;
    font-weight:400;
    margin:0px;
    padding:5px 0px 5px 0px;
    color:#FFF;
}

.assets_modules{
    height:18px;
    font-size:10px;
    color:#FFF;
}
.am_incidents{
    width:50px;
    border-left:3px solid #FF2D2E;
    background-color:#525268;
    padding:1px 2px 2px 4px;
    float:left;
    margin:3px;
}

.am_threats{
    width:64px;
    border-left:3px solid #3DD598;
    background-color:#525268;
    padding:1px 2px 2px 4px;
    float:left;
    margin:3px;
}

.am_vulnerabilities{
    width:70px;
    border-left:3px solid #1E75FF;
    background-color:#525268;
    padding:1px 2px 2px 4px;
    float:left;
    margin:3px;
}

.am_risks{
    width:35px;
    border-left:3px solid #FFC542;
    background-color:#525268;
    padding:1px 2px 2px 4px;
    float:left;
    margin:3px;
}

.am_module_first{
    margin-left:0px;
}

.fm-top-text{
    background-color:#fff !important;
    border-radius:5px !important;
}

.fm-top-text h1{
    font-size:35px;
    color:#31aa85;
    text-transform:uppercase;
    line-height:38px;
    margin:0px;
    padding:10px 0px 10px 0px;
}


.fm-top-text p{
    font-family: 'Assistant', sans-serif !important;
    font-size:16px !important;
    color:#59595a !important;
    margin:0px !important;
    padding:10px 0px 10px 0px !important;
    text-transform: none !important;
    font-weight: 400 !important;
}

/*processbar*/

.sirp_progress{
    width: 225px;
    height: 225px;
    line-height: 225px;
    background: none;
    margin: 0 auto;
    box-shadow: none;
    position: relative;
}
.sirp_progress:after{
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 12px solid #404e67;
    position: absolute;
    top: 0;
    left: 0;
}
.sirp_progress > span{
    width: 51%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
}
.sirp_progress .progress-left{
    left: 0;
}
.sirp_progress .progress-bar{
    width: 100%;
    height: 100%;
    background: none;
    border-width: 12px;
    border-style: solid;
    position: absolute;
    top: 0;
}
.sirp_progress .progress-left .progress-bar{
    left: 100%;
    border-top-right-radius: 225px;
    border-bottom-right-radius: 225px;
    border-left: 0;
    -webkit-transform-origin: center left;
    transform-origin: center left;
}
.sirp_progress .progress-right{
    right: 0;
}
.sirp_progress .progress-right .progress-bar{
    left: -100%;
    border-top-left-radius: 225px;
    border-bottom-left-radius: 225px;
    border-right: 0;
    -webkit-transform-origin: center right;
    transform-origin: center right;
    /*animation: loading-1 1.8s linear forwards;*/

}
.sirp_progress .progress-value{
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: transparent;
    font-size: 100px;
    font-weight:700;
  /*  color: #fff;*/
    line-height: 200px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 5%;
}
.sirp_progress.red .progress-bar{
    border-color: #fa0017;
}

.sirp_progress.red .progress-value{
    color: #fa0017;
}

.sirp_progress.yellow .progress-bar{
    border-color: #fdba04;
}
.sirp_progress.yellow .progress-value{
    color: #fdba04;
}
.sirp_progress.green .progress-bar{
    border-color: #28A745;
}
.sirp_progress.green .progress-value{
    color: #28A745;
}
/*
.sirp_progress.red .progress-left .progress-bar{
    animation: loading-2 1.5s linear forwards 1.8s;
}
.sirp_progress.yellow .progress-left .progress-bar{
    animation: loading-3 1s linear forwards 1.8s;
}

@keyframes loading-1{
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
}
@keyframes loading-2{
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(144deg);
        transform: rotate(144deg);
    }
}
@keyframes loading-3{
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}
@keyframes loading-4{
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(36deg);
        transform: rotate(36deg);
    }
}
@keyframes loading-5{
    0%{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(126deg);
        transform: rotate(126deg);
    }
}
@media only screen and (max-width: 990px){
    .sirp_progress{ margin-bottom: 20px; }
}
*/
/*processbar*/


/*processbar assets */

.progress-am{
    width: 65px;
    height: 65px;
    line-height: 65px;
    background: none;
    margin: 0 auto;
    box-shadow: none;
    position: relative;
}
.progress-am:after{
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #2d3648;
    position: absolute;
    top: 0;
    left: 0;
}
.progress-am1:after{
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0px solid #2d3648 !important;
    position: absolute;
    top: 0;
    left: 0;
}
.progress-am > span{
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
}
.progress-am .progress-left-am{
    left: 1px;
}
.progress-am .progress-bar-am{
    width: 100%;
    height: 100%;
    background: none;
    border-width: 3px;
    border-style: solid;
    position: absolute;
    top: 0;
}
.progress-am .progress-left-am .progress-bar-am{
    left: 100%;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    border-left: 0;
    -webkit-transform-origin: center left;
    transform-origin: center left;
}
.progress-am .progress-right-am{
    right: 0;
}
.progress-am .progress-right-am .progress-bar-am{
    left: -100%;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border-right: 0;
    -webkit-transform-origin: center right;
    transform-origin: center right;
   /* animation: loading-1 1.8s linear forwards;*/
}
.progress-am .progress-value-am{
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: #2d3648;
    font-size: 30px;
    font-family: 'Assistant', sans-serif;
    font-weight:700;
  /*  color: #cf000f;*/
    line-height:55px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 5%;
}
.progress-am .progress-value-am1{
    width: 90%;
    /* height: 90%; */
    border-radius: 50%;
    /* background: #2d3648; */
    font-size: 14px;
    font-family: 'Assistant', sans-serif;
    font-weight: 700;
    /* color: #cf000f; */
    line-height: 48px;
    text-align: center;
    position: absolute;
    top: 5%;
    left: 5%;
}
.progress-am.red-am .progress-bar-am{
    border-color: #fa0017;
}
.progress-am.red-am .progress-value-am{
    color: #fa0017 !Important;
}
.custom-align{
    margin:0px !important;
}
.custom-val{
    font-size: 14px !important;
    z-index: 10 !important;
    line-height: 34px !important;
    background:none !important;
}
.progress-am.yellow-am .progress-bar-am{
    border-color: #fdba04;
}
.progress-am.yellow-am .progress-value-am{
    color: #fdba04 !Important;
}

.progress-am.green-am .progress-bar-am{
    border-color: #28A745;
}
.progress-am.green-am .progress-value-am{
    color: #28A745 !Important;
}


/*
.progress-am.red-am .progress-left-am .progress-bar-am{
    animation: loading-2 1.5s linear forwards 1.8s;
}
*/


/*processbar*/


.fm-new-table-box{
    background-color:#FFFFFF;
    border-radius:5px;
    width:100%;
    padding:5px;
    margin:10px 0px 10px 0px;
}
.fm-new-table-heading h1{
    color: #38445a;
    font-weight: bold;
    text-align: left;
    font-size: 40px;
    text-transform: uppercase;
}
.fm-new-table-box h2{
    color: #38445a;
    font-weight: bold;
    text-align: left;
    font-size: 16px;
    text-transform: uppercase;
    padding-bottom:10px;
}

.fm-incidents-top{
    border-top:5px solid #ff6384;
}
.fm-threats-top{
    border-top:3px solid #36a2eb;
}
.fm-vulnerabilities-top{
    border-top:3px solid #ffcd56;
}
.fm-risks-top{
    border-top:3px solid #4bc0c0;
}


  /* table tbody > tr > td:first-child {
        text-align: left;
    } */
`;
