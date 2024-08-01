package com.example.fuchuang.service.impl;

import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.Score;
import com.example.fuchuang.mapper.ScoreMapper;
import com.example.fuchuang.service.IScoreService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 打分 服务实现类
 * </p>
 *
 * @author posty
 * @since 2024-03-13
 */
@Service
public class ScoreServiceImpl extends ServiceImpl<ScoreMapper, Score> implements IScoreService {

    @Autowired
    public ScoreMapper scoreMapper;

    @Override
    public Result addScore(Score score) {

        scoreMapper.addScore(score);

        return Result.success("评分成功");

    }
}
