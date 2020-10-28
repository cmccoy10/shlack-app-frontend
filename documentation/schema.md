# Shlack Data Schema

Users
-----


| attribute name | data type | details |
| - | - | - |
| id | integer | primary key, not null |
| username | varchar(20) | not null, unique |
| fullName | varchar(30) | not null |
| email | varchar(40) | not null, unique |
| bio | varchar(200) |  |
| imgUrl | varchar |   |
| hashedPassword | varchar | not null, (binary) |

ChannelMembers
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| channelId | integer | not null, foreign key |
| userId | integer | not null, foreign key |
| owner | boolean |  |


Channels
--------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| title | varchar(40) | not null |
| topic | varchar(200) |   |

ChannelMessages
---------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| channelId | integer | not null, foreign key |
| userId | integer | not null, foreign key |
| body | varchar(5000 | not null |
| createdAt | date |   |

Pins
----


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| channelId | integer | not null, foreign key |
| channelMessageId | integer | not null, foreign key |

Reactions
---------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| channelMessageId | integer | foreign key |
| directMessageId | integer | foreign key |
| userId | integer | not null, foreign key |
| unicodeVal | varchar | not null |

Replies
-------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| channelMessageId | integer | foreign key |
| directMessageId | integer | foreign key |
| userId | integer | not null, foreign key |
| body | varchar(300) | not null |
| createdAt | date |   |

GroupMembers
------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| directGroupId | integer | not null, foreign key |
| userId | integer | not null, foreign key |

DirectGroups
------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |

DirectMessages
--------------


| attribute name | data type | details |
| - | - | - |
| id | integer | not null, primary key |
| directGroupId | integer | not null, foreign key |
| userId | integer | not null, foreign key |
| body | varchar(500) | not null |
| createdAt | date |   |
