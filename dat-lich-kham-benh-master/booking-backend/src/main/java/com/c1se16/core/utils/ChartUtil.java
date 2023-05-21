package com.c1se16.core.utils;

import com.c1se16.core.constant.Constant;
import com.c1se16.core.response.ChartResponse;

import java.util.ArrayList;
import java.util.List;

public class ChartUtil {

    public static List<ChartResponse> fill12Month(List<ChartResponse> list) {

        List<ChartResponse> chartResponses = new ArrayList<>();
        for (int i = 1; i < Constant.MONTH_SHORT_NAME.size(); i++) {

            int finalI = i;
            ChartResponse chartResponse = list.stream().filter(x -> Integer.parseInt(x.getName()) == finalI)
                    .findFirst()
                    .orElse(new ChartResponse() {
                        @Override
                        public String getName() {
                            return String.valueOf(finalI);
                        }

                        @Override
                        public int getValue() {
                            return 0;
                        }
                    });
            chartResponses.add(new ChartResponse() {
                @Override
                public String getName() {
                    return Constant.MONTH_SHORT_NAME.get(Integer.parseInt(chartResponse.getName()));
                }

                @Override
                public int getValue() {
                    return chartResponse.getValue();
                }
            });
        }
        return chartResponses;
    }
}
