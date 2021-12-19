

import { configureStore, createSlice } from "@reduxjs/toolkit"; 
const landingSlice = createSlice(
  { name: "storeReducer", 
    initialState: {saying:{0:'땀은 지방의 눈물이다.',
                           1:'땀은 지방의 눈물이다.',
                           2:'배움에는 왕도가 없다.',
                           3:'세상에 공짜는 없다.',
                           4:'기대하지 말아라.\n기대는 고통의 원천이다.',
                           5:'사랑이 있는 곳에는\n고통이 함께 한다.'},
                   page: 1,
                   example1:{0:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n2km 달리고 왔어요!\n-수상한 펭귄님-',
                             1:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n2km 달리고 왔어요!\n-수상한 펭귄님-',
                             2:'"배움에는 왕도가 없다."\n명언을 실천하기 위해서\n책을 3권이나 봤어요.\n-수상한 펭귄님-',
                             3:'"세상에 공짜는 없다."\n명언을 실천하기 위해서\n공기를 돈 주고 샀어요.\n-수상한 펭귄님-',
                             4:'"기대하지 말아라."\n기대는 고통의 원천이다."\n명언을 실천하기 위해서\n기대를 안했어요!\n-수상한 펭귄님-',
                             5:'"사랑이 있는 곳에는"\n고통이 함께 한다."\n명언을 실천하기 위해서\n연애를 포기했어요!\n-수상한 펭귄님-'
                   },       
                   example2:{0:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n인왕산을 타고 왔습니다.\n-이상한 코끼리님-',
                             1:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n인왕산을 타고 왔습니다.\n-이상한 코끼리님-',
                             2:'"배움에는 왕도가 없다"\n명언을 실천하기 위해서\n책을 3권이나 봤어요.\n-이상한 코끼리님-',
                             3:'"세상에 공짜는 없다."\n명언을 실천하기 위해서\n공기를 돈 주고 샀어요.\n-이상한 코끼리님-',
                             4:'"기대하지 말아라."\n기대는 고통의 원천이다."\n명언을 실천하기 위해서\n기대를 안했어요!\n-이상한 코끼리님-',
                             5:'"사랑이 있는 곳에는"\n고통이 함께 한다."\n명언을 실천하기 위해서\n연애를 포기했어요!\n-이상한 코끼리님-'
                   },
                   example3:{0:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n자전거를 타고 왔어요!!\n-상한 고구마님-',
                             1:'"땀은 지방의 눈물이다."\n명언을 실천하기 위해서\n자전거를 타고 왔어요!!\n-상한 고구마님-',
                             2:'"배움에는 왕도가 없다"\n명언을 실천하기 위해서\n책을 3권이나 봤어요.\n-상한 고구마님-',
                             3:'"세상에 공짜는 없다."\n명언을 실천하기 위해서\n공기를 돈 주고 샀어요.\n-상한 고구마님-',
                             4:'"기대하지 말아라."\n기대는 고통의 원천이다."\n명언을 실천하기 위해서\n기대를 안했어요!\n-상한 고구마님-',
                             5:'"사랑이 있는 곳에는"\n고통이 함께 한다."\n명언을 실천하기 위해서\n연애를 포기했어요!\n-상한 고구마님-'
                   }
                  },
    reducers: { plus: (state, action) => {state.page++},
                minus: (state, action) => {state.page--},
                all: (state, action) => {state.page=0},
                health: (state, action) => {state.page=1},
                study: (state, action) => {state.page=2},
                economy: (state, action) => {state.page=3},
                relationship: (state, action) => {state.page=4},
                love: (state, action) => {state.page=5}  
               } });
                
export const { plus, minus, all, health, study, economy, relationship, love } = landingSlice.actions;
export default configureStore({ reducer: landingSlice.reducer });

