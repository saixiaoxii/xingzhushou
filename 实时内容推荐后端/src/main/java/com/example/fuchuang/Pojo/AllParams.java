package com.example.fuchuang.Pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class AllParams implements Serializable {

    @ApiModelProperty(value = "课程id")
    private String classId;

    @ApiModelProperty(value = "学习时间")
    private Integer studyTime;

    @ApiModelProperty(value = "总时长")
    private Integer totalTime;

    @ApiModelProperty(value = "用户兴趣")
    private String interest;

    @ApiModelProperty(value = "打分")
    private List<Map<String, Objects>> score;

}
