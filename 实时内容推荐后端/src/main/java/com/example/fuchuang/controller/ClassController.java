package com.example.fuchuang.controller;


import com.example.fuchuang.DTO.AllParamsDTO;
import com.example.fuchuang.DTO.ClassIdDTO;
import com.example.fuchuang.DTO.ClassTimeDTO;
import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.Pojo.Class;
import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.StudyTime;
import com.example.fuchuang.Pojo.UserId;
import com.example.fuchuang.service.impl.ClassServiceImpl;
import com.example.fuchuang.service.impl.StudyTimeServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 课程表 前端控制器
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Api(tags = "课程")
@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    public ClassServiceImpl classService;

    @Autowired
    public StudyTimeServiceImpl studyTimeService;

    @Autowired
    public RedisTemplate redisTemplate;

//    @ApiOperation("通过评分获取推荐")
//    @PostMapping("/adviceByScore")
//    public Result classAdviceByScore(@RequestBody ClassIdDTO classIdDTO){
//
//        List<Class> classes = classService.adviceByScore(classIdDTO);
//
//        return Result.success(classes);
//    }
//
//    @ApiOperation("通过兴趣获取推荐")
//    @PostMapping("/adviceByInterest")
//    public Result adviceByInterest(@RequestBody InterestDTO interestDTO){
//
//        List<Class> classes = classService.adviceByInterest(interestDTO);
//
//        return Result.success(classes);
//    }
//
//    @ApiOperation("通过学习时间获取推荐")
//    @PostMapping("/adviceByTime")
//    public Result adviceByTime(@RequestBody ClassTimeDTO classTimeDTO){
//
//        StudyTime studyTime = new StudyTime();
//
//        studyTime.setClassId(classTimeDTO.getClassId());
//
//        studyTime.setUserId(UserId.getUserId());
//
//        studyTime.setTotalTime(classTimeDTO.getTotalTime());
//
//        //判断用户是否有学习过
//        if (studyTimeService.selectTime(studyTime) == 0) {
//
//            //是第一次学习本课程
//            studyTime.setStudyTime(classTimeDTO.getStudyTime());
//
//            studyTimeService.addTime(studyTime);
//
//        } else {
//
//            studyTime.setStudyTime(studyTimeService.selectTime(studyTime) + classTimeDTO.getStudyTime());
//
//            studyTimeService.updateTime(studyTime);
//
//        }
//
//        List<Class> classes = classService.adviceByTime(studyTime);
//
//        return Result.success(classes);
//    }

    @ApiOperation("推荐")
    @GetMapping("/advice")
    public Result advice(@RequestParam("interest") List<String> interest){

        if(interest != null){

            //test
            System.out.println(interest);

            InterestDTO interestDTO = new InterestDTO();

            interestDTO.setInterest(interest);

            interestDTO.setClassId(redisTemplate.opsForHash().get(UserId.getUserId(),"classId").toString());

            List<Class> classes = classService.adviceByInterest(interestDTO);

            return Result.success(classes);
        }else {

            ClassIdDTO classIdDTO = new ClassIdDTO();

            classIdDTO.setClassId(redisTemplate.opsForHash().get(UserId.getUserId(),"classId").toString());

            List<Class> classes = classService.adviceByScore(classIdDTO);

            return Result.success(classes);
        }

    }

    @ApiOperation("添加课程id")
    @PostMapping("/{classId}")
    public Result addClassId(@PathVariable String classId){

        redisTemplate.opsForHash().put(UserId.getUserId(),"classId",classId);

//        //test
//        System.out.println(redisTemplate.opsForHash().get(UserId.getUserId(),"classId"));

        return Result.success();
    }

}
