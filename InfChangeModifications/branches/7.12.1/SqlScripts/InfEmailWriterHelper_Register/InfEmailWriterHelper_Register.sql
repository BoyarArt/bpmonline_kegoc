INSERT INTO EmailTemplateMacros(Name, Parentid, ColumnPath)
VALUES (
    'InfEmailWriterHelper',
    (SELECT TOP 1 Id
    FROM EmailTemplateMacros
    WHERE Name = '@Invoke'),
    'Terrasoft.Configuration.InfEmailWriterHelper'
)