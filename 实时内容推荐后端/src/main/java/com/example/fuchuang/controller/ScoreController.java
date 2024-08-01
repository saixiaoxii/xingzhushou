package com.example.fuchuang.controller;


import com.example.fuchuang.DTO.ScoreDTO;
import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.Score;
import com.example.fuchuang.Pojo.UserId;
import com.example.fuchuang.service.impl.ScoreServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 打分 前端控制器
 * </p>
 *
 * @author posty
 * @since 2024-03-13
 */
@Api(tags = "评分")
@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    public ScoreServiceImpl scoreService;

    @Autowired
    public RedisTemplate redisTemplate;

    @ApiOperation("评分")
    @PostMapping
    public Result score(@RequestBody ScoreDTO scoreDTO){

        Score score = new Score();

        score.setScore(scoreDTO.getScore());

        score.setClassId(redisTemplate.opsForHash().get(UserId.getUserId(),"classId").toString());

        score.setUserId(UserId.getUserId());

        return scoreService.addScore(score);

    }

}
