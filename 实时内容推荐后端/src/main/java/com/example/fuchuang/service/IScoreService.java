package com.example.fuchuang.service;

import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.Score;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 打分 服务类
 * </p>
 *
 * @author posty
 * @since 2024-03-13
 */
public interface IScoreService extends IService<Score> {

    public Result addScore(Score score);

}
