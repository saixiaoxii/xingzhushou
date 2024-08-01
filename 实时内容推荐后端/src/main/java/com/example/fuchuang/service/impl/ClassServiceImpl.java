package com.example.fuchuang.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fuchuang.DTO.ClassIdDTO;
import com.example.fuchuang.DTO.ClassTimeDTO;
import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.Pojo.*;
import com.example.fuchuang.Pojo.Class;
import com.example.fuchuang.mapper.ClassMapper;
import com.example.fuchuang.mapper.ScoreMapper;
import com.example.fuchuang.mapper.UserMapper;
import com.example.fuchuang.service.IClassService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * <p>
 * 课程表 服务实现类
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Service
public class ClassServiceImpl extends ServiceImpl<ClassMapper, Class> implements IClassService {

    @Autowired
    public UserMapper userMapper;

    @Autowired
    public ClassMapper classMapper;

    @Autowired
    public ScoreMapper scoreMapper;

    //通过学习时长
    @Override
    public List<Class> adviceByTime(StudyTime studyTime) {

        //设置发送的参数集合
        List<Object> objects = new ArrayList<>();

        //设置传输实体
        AllParams allParams = new AllParams();

        //设置url
        String url = "http://40.121.89.218/model_recommend";

        //设置返回的class集合
        List<Class> classes = new ArrayList<>();

        //查询用户评分的集合
        Score score = new Score();

        score.setClassId(studyTime.getClassId());

        score.setUserId(UserId.getUserId());

        List<Map<String, Objects>> scores = scoreMapper.selectSimilarClassScore(score);

//        //test
//        System.out.println(scores);

        if (scores != null) {

            allParams.setScore(scores);

        }

        //查找用户兴趣并放入objects集合
        String userId = UserId.getUserId();

        String interest = userMapper.selectInterest(userId);

        allParams.setInterest(interest);

        allParams.setClassId(studyTime.getClassId());

        allParams.setTotalTime(studyTime.getTotalTime());

        allParams.setStudyTime(studyTime.getStudyTime());

        objects.add(allParams);

        //转化成JSON格式
        String jsonString = JSON.toJSONString(objects);

        //创建httpclient
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //设置url
        HttpPost httpPost = new HttpPost(url);

        //封装entity
        StringEntity entity = new StringEntity(jsonString,"UTF-8");

        //test
        System.out.println(entity);
        System.out.println(jsonString);

        //设置实体
        httpPost.setEntity(entity);
        httpPost.setHeader("Content-Type", "application/json;charset=utf8");

        //设置响应
        CloseableHttpResponse response = null;

        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);

            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();

            //打印响应状态
            System.out.println("响应状态为:" + response.getStatusLine());

            //test
            System.out.println(responseEntity);

            //处理响应体
            String string = EntityUtils.toString(responseEntity);

            //test
            System.out.println(string);

            // 解析 JSON 字符串为 JSONObject
            JSONObject jsonObject = JSON.parseObject(string);

            //拿到data数据
            JSONArray data = jsonObject.getJSONArray("data");

            //遍历
            for (int i = 0;i < data.size();i++) {

                classes.add(classMapper.selectNameAndUrlAndPicById(data.getString(i)));

            }

        } catch (ClientProtocolException e) {

            e.printStackTrace();

        } catch (ParseException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        return classes;
    }


    //通过评分
    @Override
    public List<Class> adviceByScore(ClassIdDTO classIdDTO) {

//        //创建参数容器
//        StringBuilder params = new StringBuilder();
//        try {
//            // 字符数据最好encoding以下;这样一来，某些特殊字符才能传过去(不encoding的话,传不过去)
//            params.append("classId = " + URLEncoder.encode(classIdDTO.getClassId(),"utf-8"));
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }

        //设置发送的参数集合
        List<Object> objects = new ArrayList<>();

        //设置传输实体
        AllParams allParams = new AllParams();

        //放入classId和兴趣
        allParams.setClassId(classIdDTO.getClassId());

        allParams.setInterest(userMapper.selectInterest(UserId.getUserId()));

        //设置url
        String url = "http://40.121.89.218/model_recommend";

        //设置返回的class集合
        List<Class> classes = new ArrayList<>();

        //查询用户评分的集合
        Score score = new Score();

        score.setClassId(classIdDTO.getClassId());

        score.setUserId(UserId.getUserId());

        List<Map<String, Objects>> scores = scoreMapper.selectSimilarClassScore(score);

//        //test
//        System.out.println(scores);

        if (scores != null) {

            allParams.setScore(scores);

        }

        //创建httpclient实例
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //创建httppost实例,指定url,并且将参数放入
        //注：POST传递普通参数时，方式与GET一样即可，这里直接在url后缀上参数
//        HttpPost httpPost = new HttpPost(url + "?" +params);
        HttpPost httpPost = new HttpPost(url);

        //添加参数并封装

        objects.add(allParams);

        String jsonString = JSON.toJSONString(objects);

        StringEntity entity = new StringEntity(jsonString, "UTF-8");

        // post请求是将参数放在请求体里面传过去的;这里将entity放入post请求体中
        httpPost.setEntity(entity);

        httpPost.setHeader("Content-Type", "application/json;charset=utf8");

        //test
        System.out.println(entity);
        System.out.println(jsonString);

        //设置响应体
        CloseableHttpResponse response = null;

        try{
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);

            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();

            //打印响应状态
            System.out.println("响应状态为:" + response.getStatusLine());

            //test
            System.out.println(responseEntity);

            //处理响应体
            String string = EntityUtils.toString(responseEntity);

            //test
            System.out.println(string);

            // 解析 JSON 字符串为 JSONObject
            JSONObject jsonObject = JSON.parseObject(string);

            //拿到data数据
            JSONArray data = jsonObject.getJSONArray("data");

            //遍历
            for (int i = 0;i < data.size();i++) {

                classes.add(classMapper.selectNameAndUrlAndPicById(data.getString(i)));

            }

        } catch (ClientProtocolException e) {

            e.printStackTrace();

        } catch (ParseException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        return classes;
    }

    //通过兴趣
    @Override
    public List<Class> adviceByInterest(InterestDTO interestDTO) {

        //设置url
        String url = "http://40.121.89.218/model_recommend";

        //设置发送的参数集合
        List<Object> objects = new ArrayList<>();

        //设置返回的class集合
        List<Class> classes = new ArrayList<>();

        //设置传输实体
        AllParams allParams = new AllParams();

        //查询用户评分的集合
        Score score = new Score();

        score.setClassId(interestDTO.getClassId());

        score.setUserId(UserId.getUserId());

        List<Map<String, Objects>> scores = scoreMapper.selectSimilarClassScore(score);

//        //test
//        System.out.println(scores);

        if (scores != null) {

            allParams.setScore(scores);

        }

        //得到用户兴趣
        List<String> interest = interestDTO.getInterest();

        allParams.setInterest(interest.toString());

        allParams.setClassId(interestDTO.getClassId());

        //将兴趣存入表中
        userMapper.addInterest(interest.toString(),UserId.getUserId());

        //转化成JSON格式

        objects.add(allParams);

        String jsonString = JSON.toJSONString(objects);

        //创建httpclient
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //设置url
        HttpPost httpPost = new HttpPost(url);

        //封装enity
        StringEntity entity = new StringEntity(jsonString,"UTF-8");

        //设置实体
        httpPost.setEntity(entity);

        httpPost.setHeader("Content-Type", "application/json;charset=utf8");

        //test
        System.out.println(entity);
        System.out.println(jsonString);

        //设置响应
        CloseableHttpResponse response = null;

        try {
            // 由客户端执行(发送)Post请求
            response = httpClient.execute(httpPost);

            // 从响应模型中获取响应实体
            HttpEntity responseEntity = response.getEntity();

            //打印响应状态
            System.out.println("响应状态为:" + response.getStatusLine());

            //test
            System.out.println(responseEntity);

            //处理响应体
            String string = EntityUtils.toString(responseEntity);

            //test
            System.out.println(string);

            // 解析 JSON 字符串为 JSONObject
            JSONObject jsonObject = JSON.parseObject(string);

            //拿到data数据
            JSONArray data = jsonObject.getJSONArray("data");

            //遍历
            for (int i = 0;i < data.size();i++) {

                classes.add(classMapper.selectNameAndUrlAndPicById(data.getString(i)));

            }

        } catch (ClientProtocolException e) {

            e.printStackTrace();

        } catch (ParseException e) {

            e.printStackTrace();

        } catch (IOException e) {

            e.printStackTrace();

        } finally {
            try {
                // 释放资源
                if (httpClient != null) {
                    httpClient.close();
                }
                if (response != null) {
                    response.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        return classes;
    }

}
