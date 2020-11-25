function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
var main = {

    init: function init() {
        var _this = this;
        _this.getBarData(); //各矿监控测点统计       
    },
    //各矿监控测点统计图表初始化样式配置
    MonitoringStatisticsInit: function (domId, tmpo, yAxiMineNames, applycata) {
        var dom = document.getElementById(domId);

        dom.style.width = window.innerWidth + 'px';
        dom.style.height = window.innerHeight-20 + 'px';
       
        var _this = this;
        var myChart = echarts.init(dom);
        var option = {
            legend: {
                data: applycata
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'

                }
            },
            legend: {
                x: 'left',
                y: 'top',
                //x2: 0,
                //y2:0,
                textStyle: {
                    color: 'white',
                    fontSize: '10',
                },
                itemHeight: 15,
                itemWidth: 15,
                icon: "circle",
                data: applycata
            },

            grid: [
                { left: '20%', right: '5%', bottom: '15%', top: "10%" }
            ],
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                boundaryGap: [0, 0.01],
                axisLine: {
                    textStyle: {
                        color: '#53d4a4'
                    },
                    lineStyle: {
                        color: 'white'
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: yAxiMineNames,
                axisLine: {
                    textStyle: {
                        color: 'white'
                    },
                    lineStyle: {
                        color: 'white'
                    }
                }
            },
            series: tmpo
        };

        if (option && _typeof(option) === "object") {
            myChart.setOption(option, true);
        }
    },
    //各矿监控测点统计图表数据
    getBarData: function getBarData() {
        var _this = this;
        $.ajax({
            url: httpIP + '/api/api/GetMineAllPointStatics',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "user_id": $.cookie('user_token')
            },
            success: function success(result) {
                var data = result.Data;
                let color = ['#22abec', '#53d4a4', '#f6b37f', '#ea6978'];
                let BarData = [];
                var newdata = [];
                let yAxiMineNames = [];
                let applycata = [];
                for (var i = 0; i < data.length; i++) {
                    let item = data[i];
                    yAxiMineNames.push(item.MineName);
                    for (var j = 0; j < item.List.length; j++) {
                        BarData.push(item.List[j])
                    }
                }
                for (var j = 0; j < BarData.length; j++) {
                    item1 = BarData[j];
                    if (applycata.indexOf(item1.PointCategory) == -1) {
                        applycata.push(item1.PointCategory);
                    }
                };
                var tmpo = null;
                $.each(applycata, function (index, elemennt) {
                    var json = {};
                    tmpo = {
                        name: elemennt,
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: color[index]
                            }
                        },
                    };
                    var data = []
                    $.each(BarData, function (index, ele) {
                        if (ele.PointCategory == elemennt) {
                            //如果属于当前类型，给这个x轴赋对应数据
                            data.push(ele.Count)
                        }
                    });
                    tmpo.data = data;
                    newdata.push(tmpo);
                });
                _this.MonitoringStatisticsInit('personnelinforChart', newdata, yAxiMineNames, applycata);
            }
        });
    }
};