package com.example.fuchuang.Pojo;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 打分
 * </p>
 *
 * @author posty
 * @since 2024-03-13
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("score")
@ApiModel(value="Score对象", description="打分")
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableField(value = "user_id")
    @ApiModelProperty(value = "用户id")
    private String userId;

    @TableField(value = "class_id")
    @ApiModelProperty(value = "课程id")
    private String classId;

    @ApiModelProperty(value = "打分")
    private Integer score;


}
