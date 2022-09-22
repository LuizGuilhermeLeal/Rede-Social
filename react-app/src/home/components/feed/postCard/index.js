import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from "@mui/material/IconButton";


function PostCard ( { post }) {
    return(
        <Card className="card">
            <CardHeader className="cardHeader"
            avatar={<Avatar src={post.author.avatar}/>}
            subheader={<Typography variant="h6">{post.author.name}</Typography>}
            action={<Typography variant="caption">{post.date}</Typography>}/>

            <CardContent 
                className="cardContent"
                noWrap
                maxWidth="md">
                    <CardMedia>
                        <img src={ post.image } alt='/'className='image'/>
                    </CardMedia>
            </CardContent>
            
            <CardActions disableSpacing>
                
                <IconButton aria-label="like">
                    <FavoriteIcon/>
                </IconButton>

                <IconButton aria-label="comment">
                    <CommentIcon/>
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>
        </Card>
    );
}

export default PostCard;